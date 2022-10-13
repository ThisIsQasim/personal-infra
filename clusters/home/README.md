# Home Cluster

Scripts to bootstrap home cluster

```
kubectl create ns argocd
kubectl -n argocd create secret generic age-private-key --from-file=keys.txt=/path/to/keys.txt
kustomize build --enable-alpha-plugins . | kubectl apply -f -
```