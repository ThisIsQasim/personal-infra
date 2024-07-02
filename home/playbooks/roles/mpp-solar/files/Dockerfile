FROM python:3.11-slim
RUN apt update
RUN apt-get install -y pkg-config libsystemd-dev gcc
RUN pip install paho-mqtt systemd-python 'mppsolar[systemd]'
RUN sed -i 's:key.replace(" ", "_").replace("/","_")$:key.replace(" ", "_").replace("/","_").replace("-",""):g' \
	  /usr/local/lib/python3.11/site-packages/mppsolar/outputs/prom.py
COPY prom_file.py /usr/local/lib/python3.11/site-packages/mppsolar/outputs/prom_file.py

WORKDIR "/etc/mpp-solar"
CMD mpp-solar -C mpp-solar.conf --daemon