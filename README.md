# json2graphite
### Send JSON metrics to Graphite

# Installation

Install with npm

```shell
npm install -g json2graphite
```

# Usage

```bash
$ json2graphite
Options:
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  --prefix, -x     Prefix added to each key. Can be nested (e.g. system.values)
  --host, -h       Graphite host.                                     [required]
  --port, -p       Graphite port.                                [default: 2003]
  --metrics, -m    JSON metrics to send to graphite. Reads from STDIN by
                   default.                                       [default: "-"]
  --timestamp, -t  Timestamp
```

Send JSON metrics
```bash
json2graphite --host 127.0.0.1 --metrics '{"cpu": "0.25", "memory":"2GB"}'

# plaintext metrics sent to graphite ==>
cpu 0.25 1532384798
memory 2GB 1532384798
```

Read JSON from STDIN
```bash
echo '{"cpu": "0.25", "memory":"2GB"}' | json2graphite --host 127.0.0.1

# plaintext metrics sent to graphite ==>
cpu 0.25 1532384798
memory 2GB 1532384798
```

Specify a timestamp
```bash
json2graphite --host 127.0.0.1 --metrics '{"cpu": "0.25", "memory":"2GB"}' --timestamp 1532384500000

# plaintext metrics sent to graphite ==>
cpu 0.25 1532384500
memory 2GB 1532384500
```

Specify a prefix for metrics
```bash
json2graphite --host 127.0.0.1 --metrics '{"cpu": "0.25", "memory":"2GB"}' --prefix "servers.host1"

# plaintext metrics sent to graphite ==>
servers.host1.cpu 0.25 1532385129
servers.host1.memory 2GB 1532385129
```
