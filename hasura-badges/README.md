# Badges Project

This project is going to support a multi-tenant application to manage competence growth in our company.
Each Engineer will pursue one or more experience-driven goals named “Badges”.

A Badge represents a mix of knowledge and experience that an Engineer has achieved.
Badges are proposed by a stakeholder of the Engineer’s growth. It could be the Engineering Manager or other mentor actors.

Both EM and Engineer can create a new Badge Proposal with an optional motivation to pursue a Badge.The counterpart must approve the proposal.

In order to achieve a Badge an Engineer must collect Evidences that the Badge’s requirements have been met.
Once enough Evidence is collected, the Engineer can apply for an Issuing Request.

A stakeholder, or a group of stakeholders, act as an Issuer and verify the Issuing Request.
The request can be approved or failed. If failed, a motivation will be provided by the Issuer.

Badge Design App (Backoffice)
- [ ] It should CRUD on Badges
- [ ] It should CRUD on Requirements
- [ ] It should COMMIT a new Badge with its own Requirements
- [ ] It should CRUD on Managers
- [ ] It should CRUD on Engineers
- [ ] It should CRUD on Manger<>Engineer relation

Managers App
- [ ] It should show the list of Associated Engineers
- [ ] It should show the list of Committed Badges
- [ ] It should add a Engineer<>Badge candidature proposal with a description
- [ ] It should list existing candidatures
- [ ] It should approve a candidature
- [ ] It should list ongoing badges candidatures
- [ ] It should be able to list the issuing requests
- [ ] It should be able to approve an issuing request
- [ ] It should be able to reject an issuing request with motivation

Engineer App
- [ ] It should list available badges
- [ ] It should list candidature proposals from the Mangers
- [ ] It should accept candidature proposal
- [ ] It should decline a candidature proposal with a motivation
- [ ] It should create a new candidature proposal with a motivation
- [ ] It should CRUD on a proposal’s Evidences
- [ ] It should submit an issue request
- [ ] It should see all data associated with a badge proposal

