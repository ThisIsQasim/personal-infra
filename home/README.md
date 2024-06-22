# Home Cluster

Scripts to bootstrap home cluster

```
kubectl create ns argocd
kubectl -n argocd create secret generic age-private-key --from-file=keys.txt=/path/to/keys.txt
kustomize build --enable-alpha-plugins --enable-exec . | kubectl apply -f -
```

Requires [ksops](https://github.com/viaduct-ai/kustomize-sops), [sops](https://github.com/mozilla/sops) & [age](https://age-encryption.org/).
Expects the age private key at `~/Library/Application\ Support/sops/age/keys.txt` or `$XDG_CONFIG_HOME/sops/age/keys.txt`
