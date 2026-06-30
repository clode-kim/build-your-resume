terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
  # bootstrap 자신은 로컬 state 사용 (닭-달걀 문제 회피)
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# ── 변수 ─────────────────────────────────────────────────────────────────────

variable "subscription_id" {
  description = "Azure subscription ID (또는 환경변수 ARM_SUBSCRIPTION_ID 사용)"
  type        = string
  default     = ""
}

variable "resource_group_name" {
  type    = string
  default = "clode-llmops-rg"
}

variable "location" {
  type    = string
  default = "eastasia"
}

variable "storage_account_name" {
  description = "Terraform state용 Storage Account 이름 (전 세계 고유, 소문자+숫자, 3-24자)"
  type        = string
  default     = "clodeterrastate"
}

# ── 리소스 ─────────────────────────────────────────────────────────────────

resource "azurerm_storage_account" "tfstate" {
  name                     = var.storage_account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  blob_properties {
    versioning_enabled = true
  }
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_id    = azurerm_storage_account.tfstate.id
  container_access_type = "private"
}

# ── 출력 ─────────────────────────────────────────────────────────────────────
# 출력값을 environments/prod/backend.tf 에 입력한다.

output "storage_account_name" {
  value       = azurerm_storage_account.tfstate.name
  description = "environments/prod/backend.tf 의 storage_account_name 에 입력"
}

output "container_name" {
  value = azurerm_storage_container.tfstate.name
}

output "resource_group_name" {
  value = var.resource_group_name
}
