## What

A tool written to show changes from `default.yaml` to `custom.yaml`, especially useful to minimize helm chart values.

## Usage

```bash
bin/yaml-diff-linux <default.yaml> <custom.yaml>
```

## Example

```bash
# download default helm chart values
curl https://artifacthub.io/api/v1/packages/0602c8d2-b17d-432f-89f0-95000f3057a2/17.1.2/values > default.yaml

# change replication to standalone
sed 's/^architecture: replication$/architecture: standalone/' default.yaml > custom.yaml

# diff what have changed
bin/yaml-diff-linux default.yaml custom.yaml > values.yaml
```
