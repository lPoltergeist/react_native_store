import { fetch, Headers, Request, Response } from 'cross-fetch';
import { EventTarget } from 'event-target-shim';
import 'react-native-url-polyfill/auto';
import { TextDecoder, TextEncoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof global.Event === 'undefined') {
    global.Event = class Event {
        constructor(type) {
            this.type = type;
        }
    };
}

if (typeof global.EventTarget === 'undefined') {
    global.EventTarget = EventTarget;
}

if (typeof global.MessageEvent === 'undefined') {
    global.MessageEvent = class MessageEvent extends global.Event {
        constructor(type, init) {
            super(type);
            this.data = init?.data;
        }
    };
}

if (typeof global.BroadcastChannel === 'undefined') {
    global.BroadcastChannel = class BroadcastChannel {
        constructor(name) {
            this.name = name;
            this.onmessage = () => { };
            this.onmessageerror = () => { };
        }
        postMessage(message) {
            // No mobile, não temos para onde transmitir, então apenas silenciamos
        }
        close() { }
        addEventListener() { }
        removeEventListener() { }
    };
}


global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;