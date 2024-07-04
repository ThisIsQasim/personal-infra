FROM python:3.12-slim
RUN apt update
RUN apt-get install -y pkg-config libsystemd-dev gcc
RUN pip install paho-mqtt systemd-python https://github.com/ThisIsQasim/mpp-solar/archive/master.zip

WORKDIR "/etc/mpp-solar"
CMD mpp-solar -C mpp-solar.conf --daemon