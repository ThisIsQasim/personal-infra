#!/bin/bash -eo pipefail
kustomize build --enable-alpha-plugins $1 | kubectl apply -f - --dry-run=client