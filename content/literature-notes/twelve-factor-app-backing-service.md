---
{"publish":true,"title":"Twelve Factor App Backing Service","created":"2025-10-08T00:00:00.000Z","modified":"2025-11-03T20:27:08.814+01:00","tags":["backing-service","network-services","attached-resources","twelve-factor-app","config","resource"],"cssclasses":"center-images"}
---


# TWELVE FACTOR APP BACKING SERVICE

---

![[meta/assets/twelve-factor-app-attached-resources.png]]

A backing service is any service the app consumes over the network as part of its normal operation.The code of a [[twelve-factor app]] makes no distinction between local and third party services. To the app both are attached resources, accessed via a URL or credentials stored in the [[literature-notes/twelve-factor-app-config\|config]].
Each backing service is a attached [[twelve-factor-app-resource\|resource]].

---

## References
