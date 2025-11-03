---
{"publish":true,"title":"Twelve Factor App Dependencies","created":"2025-10-07T00:00:00.000Z","modified":"2025-11-03T20:27:08.820+01:00","tags":["dependency-management","app-config","environment-variables","twelve-factor-app","bash","code","scripting","terminal"],"cssclasses":"center-images"}
---


# TWELVE FACTOR APP DEPENDENCIES

---

A [[twelve-factore app]] never relies on implicit existence of system-wide packages. It declares all dependencies via a _dependency declaration_ manifest.
Furthermore, a _dependency isolation_ tool is used during execution to ensure no implicit dependencies from the surrounding systems are in use.
This has the benefit, that the setup for new developers is simplified.

---

## References
