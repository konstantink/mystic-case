FROM --platform=linux/amd64 golang:1.20.6-alpine3.17 as builder

WORKDIR /code

ENV CGO_ENABLED 1
ENV GOPATH /go
ENV GOCACHE /go-build

COPY ./back/go.sum ./back/go.mod /code/
RUN --mount=type=cache,target=/go/pkg/mod/cache \
    go mod download && go mod verify

COPY ./back /code
RUN <<EOF
apk update
apk add gcc libc-dev pkgconfig vips-dev
EOF

RUN --mount=type=cache,target=/go/pkg/mod/cache \
    --mount=type=cache,target=/go-build \
    go build -v -o /usr/local/bin/mystic-case

CMD [ "mystic-case" ]

