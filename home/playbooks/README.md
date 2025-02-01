# Run the playbook
```
pipenv run ansible-galaxy collection install prometheus.prometheus --force
pipenv run ansible-playbook -i inventory/hosts.yml mpp-solar.yml
```
