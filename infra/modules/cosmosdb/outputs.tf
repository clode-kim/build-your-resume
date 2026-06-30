output "account_name" {
  value = azurerm_cosmosdb_account.this.name
}

output "endpoint" {
  value = azurerm_cosmosdb_account.this.endpoint
}

output "primary_connection_string" {
  value       = azurerm_cosmosdb_account.this.primary_sql_connection_string
  sensitive   = true
  description = "SWA app_settings → COSMOS_CONNECTION_STRING 에 주입됨. state 파일 암호화 필수."
}
