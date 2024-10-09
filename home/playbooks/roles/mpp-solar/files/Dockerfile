FROM python:3.13-slim
RUN apt update
RUN apt-get install -y pkg-config libsystemd-dev gcc
RUN pip install paho-mqtt systemd-python mppsolar[systemd]

WORKDIR "/etc/mpp-solar"
CMD mpp-solar -C mpp-solar.conf --daemon