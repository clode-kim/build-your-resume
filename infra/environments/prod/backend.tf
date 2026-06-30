terraform {
  backend "azurerm" {
    resource_group_name = "clode-llmops-rg"
    # bootstrap apply 후 출력된 storage_account_name 으로 교체:
    #   cd infra/bootstrap && terraform init && terraform apply
    #   terraform output storage_account_name
    storage_account_name = "clodeterrastate"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}
