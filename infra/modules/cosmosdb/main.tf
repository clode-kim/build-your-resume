locals {
  # Serverless는 멀티리전·AZ 중복과 함께 사용 불가
  use_serverless = var.cosmos_serverless && !var.enable_multi_region && !var.enable_zone_redundancy

  # geo_location 블록 목록 동적 조립
  geo_locations = concat(
    [{
      location          = var.location
      failover_priority = 0
      # Serverless 모드에서는 zone_redundant 금지
      zone_redundant = var.enable_zone_redundancy && !local.use_serverless
    }],
    var.enable_multi_region && !local.use_serverless ? [{
      location          = var.secondary_location
      failover_priority = 1
      zone_redundant    = false
    }] : []
  )
}

resource "azurerm_cosmosdb_account" "this" {
  name                = var.account_name
  location            = var.location
  resource_group_name = var.resource_group_name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  dynamic "capabilities" {
    for_each = local.use_serverless ? [1] : []
    content {
      name = "EnableServerless"
    }
  }

  consistency_policy {
    consistency_level = "Session"
  }

  dynamic "geo_location" {
    for_each = local.geo_locations
    content {
      location          = geo_location.value.location
      failover_priority = geo_location.value.failover_priority
      zone_redundant    = geo_location.value.zone_redundant
    }
  }
}

resource "azurerm_cosmosdb_sql_database" "this" {
  name                = var.database_name
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
}

resource "azurerm_cosmosdb_sql_container" "this" {
  name                = var.container_name
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.this.name
  partition_key_paths = ["/userId"]

  indexing_policy {
    indexing_mode = "consistent"
    included_path { path = "/*" }
    excluded_path { path = "/\"_etag\"/?" }
  }
}
