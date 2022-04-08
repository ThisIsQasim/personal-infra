# Home Cluster

Scripts to bootstrap home cluster with fluxcd

```
eval `ssh-agent -s`; ssh-add
flux bootstrap git   --url=ssh://git@git.project.com/Qasim/infra.git   --branch=main   --path=clusters/home
```