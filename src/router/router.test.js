// import { Router } from "./route";
// import jest from 'jest-mock';

// // router.test.js

// describe("Router", () => {
//     let router;
//     const mockRequest = {
//         body: {
//             name: 'Test User'
//         },
//         params: {
//             id: '123'
//         },
//         // Add other properties as needed
//     };

//     const mockResponse = {
//         status: jest.fn().mockReturnThis(), // Allows chaining like res.status(200).send(...)
//         send: jest.fn(),
//         json: jest.fn(),
//         // Add other methods as needed
//     };

//     beforeEach(() => {
//         router = Router(mockRequest, mockResponse);
//     });

//     test("should instantiate Router", () => {
//         expect(router).toBeInstanceOf(Router);
//     });

//     test("should add a route", () => {
//         const handler = jest.fn();
//         router.addRoute("/test", handler);
//         expect(router.routes["/test"]).toBe(handler);
//     });

//     test("should call the correct handler for a route", () => {
//         const handler = jest.fn();
//         router.addRoute("/call", handler);
//         router.handle("/call");
//         expect(handler).toHaveBeenCalled();
//     });

//     test("should not call handler for unknown route", () => {
//         const handler = jest.fn();
//         router.addRoute("/known", handler);
//         router.handle("/unknown");
//         expect(handler).not.toHaveBeenCalled();
//     });

//     test("should overwrite handler if route is added twice", () => {
//         const handler1 = jest.fn();
//         const handler2 = jest.fn();
//         router.addRoute("/dup", handler1);
//         router.addRoute("/dup", handler2);
//         router.handle("/dup");
//         expect(handler1).not.toHaveBeenCalled();
//         expect(handler2).toHaveBeenCalled();
//     });
// });
