output "default_host_name" {
  value = azurerm_static_web_app.this.default_host_name
}

output "api_key" {
  value       = azurerm_static_web_app.this.api_key
  sensitive   = true
  description = <<-EOT
    GitHub Actions 배포 토큰.
    시크릿 이름 확인 후 업데이트:
      gh secret set <SECRET_NAME> --repo clode-kim/build-your-resume \
        --body "$(terraform -chdir=environments/prod output -raw swa_deployment_token)"
  EOT
}
