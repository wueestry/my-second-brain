---
{"publish":true,"title":"Twelve Factor App Config","created":"2025-10-07T00:00:00.000Z","modified":"2025-10-26T15:38:46.798+01:00","tags":["#app-config","#deployment","#environment-variables","#bash","#code","#config","#cybersecurity","#network-protocol","#resource","#scripting","#twelve-factor-app"],"cssclasses":"center-images"}
---


# TWELVE FACTOR APP CONFIG

---

An app's *config* is everything that is likely to vary between deploys in staging, production and development. This includes:
- Resource handles to the database
- Credentials to external services
- Per-deploy values such as the canonical hostname

The [[twelve-factor app]] stores config in environment variables, as they are easy to change between deploys without changing any code.

---

## References

