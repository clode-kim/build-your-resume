terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# ── 모듈 ─────────────────────────────────────────────────────────────────────

module "cosmosdb" {
  source = "../../modules/cosmosdb"

  resource_group_name    = var.resource_group_name
  location               = var.location
  account_name           = var.cosmos_account_name
  cosmos_serverless      = var.cosmos_serverless
  enable_multi_region    = var.enable_multi_region
  enable_zone_redundancy = var.enable_zone_redundancy
  secondary_location     = var.secondary_location
}

module "static_web_app" {
  source = "../../modules/static-web-app"

  resource_group_name      = var.resource_group_name
  location                 = var.location
  name                     = var.swa_name
  sku_tier                 = var.swa_sku
  cosmos_connection_string = module.cosmosdb.primary_connection_string
}

# ── 출력 ─────────────────────────────────────────────────────────────────────

output "swa_url" {
  value = "https://${module.static_web_app.default_host_name}"
}

output "swa_deployment_token" {
  value       = module.static_web_app.api_key
  sensitive   = true
  description = <<-EOT
    GitHub Actions 배포 토큰 갱신 시:
      gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN_ZEALOUS_BEACH_0392DF900 \
        --repo clode-kim/build-your-resume \
        --body "$(terraform output -raw swa_deployment_token)"
  EOT
}

output "cosmos_account_name" {
  value = module.cosmosdb.account_name
}

# ── 기존 리소스 import 명령어 (최초 1회) ─────────────────────────────────────
# ARM_SUBSCRIPTION_ID=e0c3cad0-ed2e-49bc-9a7a-0f4977e3ff8c 를 환경변수로 설정 후:
#
# terraform import module.cosmosdb.azurerm_cosmosdb_account.this \
#   /subscriptions/e0c3cad0-ed2e-49bc-9a7a-0f4977e3ff8c/resourceGroups/clode-llmops-rg/providers/Microsoft.DocumentDB/databaseAccounts/clode-cosmos
#
# terraform import module.cosmosdb.azurerm_cosmosdb_sql_database.this \
#   /subscriptions/e0c3cad0-ed2e-49bc-9a7a-0f4977e3ff8c/resourceGroups/clode-llmops-rg/providers/Microsoft.DocumentDB/databaseAccounts/clode-cosmos/sqlDatabases/resume-db
#
# terraform import module.cosmosdb.azurerm_cosmosdb_sql_container.this \
#   /subscriptions/e0c3cad0-ed2e-49bc-9a7a-0f4977e3ff8c/resourceGroups/clode-llmops-rg/providers/Microsoft.DocumentDB/databaseAccounts/clode-cosmos/sqlDatabases/resume-db/containers/resumes
#
# terraform import module.static_web_app.azurerm_static_web_app.this \
#   /subscriptions/e0c3cad0-ed2e-49bc-9a7a-0f4977e3ff8c/resourceGroups/clode-llmops-rg/providers/Microsoft.Web/staticSites/clode
