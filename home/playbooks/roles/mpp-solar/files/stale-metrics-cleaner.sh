#!/bin/sh
while sleep 60; do
 find /var/lib/node_exporter/ -type f -name '*.prom' -mmin +2 -execdir rm -- '{}' \;
done