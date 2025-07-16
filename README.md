# Spring Boot Authentication Service

A stateful session-based Authentication service built using Spring Boot. This application implements a secure multi-step login process involving username and captcha verification, followed by email-based OTP verification for user login.

# Features
- Stateful session management using Spring Securit.
- Username + captcha verification as the first step.
- Lgin access only after successfull verification.
- Logging and exception handling for traceability.

# Flow
- User submits username and captcha.
- Server validates captcha and verifies if the username exists.
- If valid an 5-digit OTP is generated and sent to the user registered email.
- User enters the OTP received via email.
- OTP is validated and on success the user is logged in and new session is created.

 # Tech Stack
 - Java 17
 - Spring Security
 - PostgreSQL
 - Angular
