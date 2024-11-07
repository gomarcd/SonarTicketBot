# SonarTicketBot

A simple Cloudflare Worker which listens for a webhook event from Sonar and creates a new ticket based on its payload.

This is a first draft.

## Considerations

Basically a microservice. A nano service. A pico service. This thing literally barely does *anything*.

But some may find it handy.

Later iterations may add functionality, or the bot could be forked to handle different scenarios, or used as part of a broader application that provides a suite of value-adds with other such simple bots.

## Security

Being under Cloudflare, a number of security features are included out of the box.

The bot will also only accept incoming requests from a specified host.