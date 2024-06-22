#!/bin/bash -exo pipefail
DIRECTORY=$1
PIPECMD=${2:-"kubectl apply -f - --dry-run=client"}
kustomize build --enable-alpha-plugins --enable-exec ${DIRECTORY} | ${PIPECMD}
