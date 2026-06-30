# 공유 provider 버전 핀 — 각 루트 모듈(bootstrap, environments/*)의
# required_providers 블록에 동일 버전을 복사해서 사용한다.
# Terraform은 디렉터리 단위로 동작하므로 이 파일 자체가 로드되지는 않는다.

# required_version = ">= 1.5.0"
# azurerm  ~> 4.0   hashicorp/azurerm
# random   ~> 3.0   hashicorp/random
