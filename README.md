# Create manual an image from a Docker-Run with GPU-Support enabled of Node-Base-Image 

1) `docker run --name node-nvidia -ti --rm --gpus=all node:21.7.1-bookworm-slim bash`

2) Check via `printenv` if the ENV-Var `NVIDIA_VISIBLE_DEVICES=all` is set

3) Run the install and cleanup command 
```shell
sed -i 's/main/main contrib non-free non-free-firmware/g' /etc/apt/sources.list.d/debian.sources \
    && apt update \
    && apt install -y --no-install-recommends --no-install-suggests nvidia-driver \
    && apt-get autoremove -y --purge \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
```
4) Check if everything is installed via double tab `nvidia-smi`
5) Save the container as an image `docker commit node-nvidia jammsen/node-nvidia-smi-base:21.7.1-bookworm-slim`