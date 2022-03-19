FROM alpine:3.15
RUN echo -e "http://mirrors.aliyun.com/alpine/v3.15/main/\nhttp://mirrors.aliyun.com/alpine/v3.15/community/" > /etc/apk/repositories
RUN apk update
RUN apk add nodejs
RUN apk add npm
RUN apk --no-cache add tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone
RUN node -v
WORKDIR /app/
COPY . .
RUN npm install
RUN npm run build
ENV HOST=0.0.0.0 NODE_ENV=production
EXPOSE 8080
CMD ["npm", "run", "serve"]
