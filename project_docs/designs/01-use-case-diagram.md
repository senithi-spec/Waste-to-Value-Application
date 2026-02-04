# 01 - Use Case Diagram

Use cases for the Waste-to-Value platform.

```mermaid
%% Use-case diagram for main actors
usecaseDiagram
  actor Generator
  actor Collector
  actor Recycler
  actor Admin

  Generator --> (Create Listing)
  Generator --> (Approve Requests)
  Collector --> (Search Listings)
  Collector --> (Request Listing)
  Recycler --> (Browse & Claim)
  (Create Listing) ..> (Notify Interested) : <<include>>
```

Edit and render using a markdown viewer that supports Mermaid or export from an authoring tool.