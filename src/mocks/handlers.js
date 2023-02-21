// src/mocks/handlers.js
import { rest } from "msw";
export const handlers = [
  // Handles a POST /login request
  rest.post("http://localhost:4010/api/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    // sessionStorage.setItem("is-authenticated", "true");

    if (
      req.body.password !== "vivekl" &&
      req.body.email === "vivekl@geekyants.com"
    ) {
      return res(
        // Send a valid HTTP status code
        ctx.status(401),
        // And a response body, if necessary
        ctx.json({
          message: `User '${req.body.email}' not found`,
        })
      );
    }

    if (req.body.email !== "vivekl@geekyants.com") {
      return res(
        // Send a valid HTTP status code
        ctx.status(403),
        // And a response body, if necessary
        ctx.json({
          message: `User '${req.body.email}' not found`,
        })
      );
    }

    return res(
      // Respond with a 200 status code
      ctx.json({
        user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV…DUwfQ.36DISVby6x8ZuuaK9ishRMM3M36QUVgRZAXCA7qeG2o",
      })
    );
  }),
];
