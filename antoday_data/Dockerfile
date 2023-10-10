FROM ubuntu:latest

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# 기본 시스템 패키지 설치
RUN apt-get update && \
  apt-get install -y --no-install-recommends tzdata g++ curl

# OpenJDK 8 설치
RUN apt-get install -y openjdk-8-jdk
ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"

# Python 3.11 설치
RUN apt-get install -y python3.11 python3.11-dev python3.11-distutils

# Python 3.11을 기본으로 설정
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1
RUN apt-get install -y pkg-config
RUN apt-get install -y libmysqlclient-dev

# pip 설치 및 설정
RUN curl https://bootstrap.pypa.io/get-pip.py | python -
RUN apt-get clean && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY . .

# Python 패키지 설치
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]