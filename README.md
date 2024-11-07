# SonarTicketBot

This is a first draft.

Bot simply does this:

:point_right: Listens for IP assignment webhook from Sonar

:point_right: Payload of matching event verified for "soft": false

:point_right: createPublicTicket mutation sent to specified instance GraphQL API

## Security

Being under Cloudflare, its usual security features are included out of the box. Additionally:

:white_check_mark: Requests are only accepted from specified host(s)

:white_check_mark: Environment variables are encrypted

:white_check_mark: Can optionally reside within client network
