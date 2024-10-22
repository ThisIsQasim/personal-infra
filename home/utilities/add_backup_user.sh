#!/bin/bash

# ssh node1 sudo bash < utilities/add_backup_user.sh
# ssh -i backups backups@node1 id

USER=backups
SSH_DIR=/home/$USER/.ssh

useradd --no-user-group -s /bin/bash -d /home/$USER -m $USER
echo "$USER ALL= NOPASSWD:$(which rsync)" >> /etc/sudoers.d/$USER


mkdir ${SSH_DIR}
chmod 700 ${SSH_DIR}
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDLo1yfIJ88if4CHQVCt0GDHOomHFn/ak56owvkpEuLJ0b02eAt/kGAd7ZjhdnDnk/zexGCZigreZYUoT4ePGXVK0eUJWnD2Lf1Itrh0eMhUTzlk0pNa/HOrwPP5RnfDsubVoCe7RB/KQA/NRE3GciLTdn7ILT+DCE5YPXWopLfQ+49vpBNnEM1oQZ7XyLxVagJurtQ1JVk85kTZvaav4P6omGEfIGJCON/z+nn43sGQlFoO52+eTvMMwMTAxJaozFOKKgLVVXfrTM1UStq/vbc9seSDhaf3CqFwMVrenjo9FLJEKpCrNj+mI26/ZTQQQOlvbJ75eEF8JW12Xw0r/lD1JWwe67FKuDLpRhAooiuk1XtBmQ3qozuNSxUHbFbIcB/wQ4i9mmNLd8RAoqEnTjuNqj042YEB1M1T9dC5k7FaarJ1g6Burm+Yrax5my3hb6/xFw55/fDwxfyRDGGD958mkN5qknqVhjF+Gr0tXKrAmmqJMafnkyktiuikj41RuU= backups" \
	>> ${SSH_DIR}/authorized_keys
chmod 0600 ${SSH_DIR}/authorized_keys
chown -R $USER ${SSH_DIR}
