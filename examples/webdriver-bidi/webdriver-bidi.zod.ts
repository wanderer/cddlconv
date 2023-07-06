import z from "zod";
export const CommandSchema = z.lazy(() =>
  z
    .object({
      id: JsUintSchema,
    })
    .and(CommandDataSchema)
    .and(ExtensibleSchema)
);
export const CommandDataSchema = z.lazy(() =>
  z.union([
    BrowserCommandSchema,
    BrowsingContextCommandSchema,
    InputCommandSchema,
    NetworkCommandSchema,
    ScriptCommandSchema,
    SessionCommandSchema,
  ])
);
export const EmptyParamsSchema = z.lazy(() => ExtensibleSchema);
export const MessageSchema = z.lazy(() =>
  z.union([CommandResponseSchema, ErrorResponseSchema, EventSchema])
);
export const CommandResponseSchema = z.lazy(() =>
  z
    .object({
      id: JsUintSchema,
      result: ResultDataSchema,
    })
    .and(ExtensibleSchema)
);
export const ErrorResponseSchema = z.lazy(() =>
  z
    .object({
      id: z.union([JsUintSchema, z.null()]),
      error: ErrorCodeSchema,
      message: z.string(),
      stacktrace: z.string().optional(),
    })
    .and(ExtensibleSchema)
);
export const ResultDataSchema = z.lazy(() =>
  z.union([
    BrowsingContextResultSchema,
    EmptyResultSchema,
    NetworkResultSchema,
    ScriptResultSchema,
    SessionResultSchema,
  ])
);
export const EmptyResultSchema = z.lazy(() => ExtensibleSchema);
export const EventSchema = z.lazy(() => EventDataSchema.and(ExtensibleSchema));
export const EventDataSchema = z.lazy(() =>
  z.union([
    BrowsingContextEventSchema,
    LogEventSchema,
    NetworkEventSchema,
    ScriptEventSchema,
  ])
);
export const ExtensibleSchema = z.lazy(() => z.record(z.string(), z.any()));
export const JsIntSchema = z.lazy(() =>
  z.literal(-9007199254740991).gte(-9007199254740991).lte(9007199254740991)
);
export const JsUintSchema = z.lazy(() =>
  z.literal(0).gte(0).lte(9007199254740991)
);
export const ErrorCodeSchema = z.lazy(() =>
  z.enum([
    "invalid argument",
    "invalid session id",
    "move target out of bounds",
    "no such alert",
    "no such element",
    "no such frame",
    "no such handle",
    "no such node",
    "no such script",
    "session not created",
    "unable to capture screen",
    "unable to close browser",
    "unknown command",
    "unknown error",
    "unsupported operation",
  ])
);
export const SessionCommandSchema = z.lazy(() =>
  z.union([
    Session.EndSchema,
    Session.NewSchema,
    Session.StatusSchema,
    Session.SubscribeSchema,
    Session.UnsubscribeSchema,
  ])
);
export const SessionResultSchema = z.lazy(() =>
  z.union([Session.NewResultSchema, Session.StatusResultSchema])
);
export namespace Session {
  export const CapabilitiesRequestSchema = z.lazy(() =>
    z.object({
      alwaysMatch: Session.CapabilityRequestSchema.optional(),
      firstMatch: z.array(Session.CapabilityRequestSchema).optional(),
    })
  );
}
export namespace Session {
  export const CapabilityRequestSchema = z.lazy(() =>
    z
      .object({
        acceptInsecureCerts: z.boolean().optional(),
        browserName: z.string().optional(),
        browserVersion: z.string().optional(),
        platformName: z.string().optional(),
        proxy: z
          .object({
            proxyType: z
              .union([
                z.literal("pac"),
                z.literal("direct"),
                z.literal("autodetect"),
                z.literal("system"),
                z.literal("manual"),
              ])
              .optional(),
            proxyAutoconfigUrl: z.string().optional(),
            ftpProxy: z.string().optional(),
            httpProxy: z.string().optional(),
            noProxy: z.array(z.string()).optional(),
            sslProxy: z.string().optional(),
            socksProxy: z.string().optional(),
            socksVersion: z.literal(0).gte(0).lte(255).optional(),
          })
          .optional(),
      })
      .and(ExtensibleSchema)
  );
}
export namespace Session {
  export const SubscriptionRequestSchema = z.lazy(() =>
    z.object({
      events: z.array(z.string()),
      contexts: z.array(BrowsingContext.BrowsingContextSchema).optional(),
    })
  );
}
export namespace Session {
  export const StatusSchema = z.lazy(() =>
    z.object({
      method: z.literal("session.status"),
      params: EmptyParamsSchema,
    })
  );
}
export namespace Session {
  export const StatusResultSchema = z.lazy(() =>
    z.object({
      ready: z.boolean(),
      message: z.string(),
    })
  );
}
export namespace Session {
  export const NewSchema = z.lazy(() =>
    z.object({
      method: z.literal("session.new"),
      params: Session.NewParametersSchema,
    })
  );
}
export namespace Session {
  export const NewParametersSchema = z.lazy(() =>
    z.object({
      capabilities: Session.CapabilitiesRequestSchema,
    })
  );
}
export namespace Session {
  export const NewResultSchema = z.lazy(() =>
    z.object({
      sessionId: z.string(),
      capabilities: z
        .object({
          acceptInsecureCerts: z.boolean(),
          browserName: z.string(),
          browserVersion: z.string(),
          platformName: z.string(),
          proxy: z.object({
            proxyType: z
              .union([
                z.literal("pac"),
                z.literal("direct"),
                z.literal("autodetect"),
                z.literal("system"),
                z.literal("manual"),
              ])
              .optional(),
            proxyAutoconfigUrl: z.string().optional(),
            ftpProxy: z.string().optional(),
            httpProxy: z.string().optional(),
            noProxy: z.array(z.string()).optional(),
            sslProxy: z.string().optional(),
            socksProxy: z.string().optional(),
            socksVersion: z.literal(0).gte(0).lte(255).optional(),
          }),
          setWindowRect: z.boolean(),
        })
        .and(ExtensibleSchema),
    })
  );
}
export namespace Session {
  export const EndSchema = z.lazy(() =>
    z.object({
      method: z.literal("session.end"),
      params: EmptyParamsSchema,
    })
  );
}
export namespace Session {
  export const SubscribeSchema = z.lazy(() =>
    z.object({
      method: z.literal("session.subscribe"),
      params: Session.SubscriptionRequestSchema,
    })
  );
}
export namespace Session {
  export const UnsubscribeSchema = z.lazy(() =>
    z.object({
      method: z.literal("session.unsubscribe"),
      params: Session.SubscriptionRequestSchema,
    })
  );
}
export const BrowserCommandSchema = z.lazy(() => Browser.CloseSchema);
export namespace Browser {
  export const CloseSchema = z.lazy(() =>
    z.object({
      method: z.literal("browser.close"),
      params: EmptyParamsSchema,
    })
  );
}
export const BrowsingContextCommandSchema = z.lazy(() =>
  z.union([
    BrowsingContext.CaptureScreenshotSchema,
    BrowsingContext.CloseSchema,
    BrowsingContext.CreateSchema,
    BrowsingContext.GetTreeSchema,
    BrowsingContext.HandleUserPromptSchema,
    BrowsingContext.NavigateSchema,
    BrowsingContext.PrintSchema,
    BrowsingContext.ReloadSchema,
  ])
);
export const BrowsingContextResultSchema = z.lazy(() =>
  z.union([
    BrowsingContext.CaptureScreenshotResultSchema,
    BrowsingContext.CreateResultSchema,
    BrowsingContext.GetTreeResultSchema,
    BrowsingContext.NavigateResultSchema,
    BrowsingContext.PrintResultSchema,
  ])
);
export const BrowsingContextEventSchema = z.lazy(() =>
  z.union([
    BrowsingContext.ContextCreatedSchema,
    BrowsingContext.ContextDestroyedSchema,
    BrowsingContext.NavigationStartedSchema,
    BrowsingContext.FragmentNavigatedSchema,
    BrowsingContext.DomContentLoadedSchema,
    BrowsingContext.LoadSchema,
    BrowsingContext.DownloadWillBeginSchema,
    BrowsingContext.NavigationAbortedSchema,
    BrowsingContext.NavigationFailedSchema,
    BrowsingContext.UserPromptClosedSchema,
    BrowsingContext.UserPromptOpenedSchema,
  ])
);
export namespace BrowsingContext {
  export const BrowsingContextSchema = z.lazy(() => z.string());
}
export namespace BrowsingContext {
  export const InfoListSchema = z.lazy(() =>
    z.array(BrowsingContext.InfoSchema)
  );
}
export namespace BrowsingContext {
  export const InfoSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      url: z.string(),
      children: z.union([BrowsingContext.InfoListSchema, z.null()]),
      parent: z
        .union([BrowsingContext.BrowsingContextSchema, z.null()])
        .optional(),
    })
  );
}
export namespace BrowsingContext {
  export const NavigationSchema = z.lazy(() => z.string());
}
export namespace BrowsingContext {
  export const NavigationInfoSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      navigation: z.union([BrowsingContext.NavigationSchema, z.null()]),
      timestamp: JsUintSchema,
      url: z.string(),
    })
  );
}
export namespace BrowsingContext {
  export const ReadinessStateSchema = z.lazy(() =>
    z.enum(["none", "interactive", "complete"])
  );
}
export namespace BrowsingContext {
  export const CaptureScreenshotSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.captureScreenshot"),
      params: BrowsingContext.CaptureScreenshotParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const CaptureScreenshotParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      clip: BrowsingContext.ClipRectangleSchema.optional(),
    })
  );
}
export namespace BrowsingContext {
  export const ClipRectangleSchema = z.lazy(() =>
    z.union([
      BrowsingContext.BoxClipRectangleSchema,
      BrowsingContext.ElementClipRectangleSchema,
    ])
  );
}
export namespace BrowsingContext {
  export const ElementClipRectangleSchema = z.lazy(() =>
    z.object({
      type: z.literal("element"),
      element: Script.SharedReferenceSchema,
      scrollIntoView: z.boolean().optional(),
    })
  );
}
export namespace BrowsingContext {
  export const BoxClipRectangleSchema = z.lazy(() =>
    z.object({
      type: z.literal("viewport"),
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    })
  );
}
export namespace BrowsingContext {
  export const CaptureScreenshotResultSchema = z.lazy(() =>
    z.object({
      data: z.string(),
    })
  );
}
export namespace BrowsingContext {
  export const CloseSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.close"),
      params: BrowsingContext.CloseParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const CloseParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
    })
  );
}
export namespace BrowsingContext {
  export const CreateSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.create"),
      params: BrowsingContext.CreateParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const CreateTypeSchema = z.lazy(() => z.enum(["tab", "window"]));
}
export namespace BrowsingContext {
  export const CreateParametersSchema = z.lazy(() =>
    z.object({
      type: BrowsingContext.CreateTypeSchema,
      referenceContext: BrowsingContext.BrowsingContextSchema.optional(),
    })
  );
}
export namespace BrowsingContext {
  export const CreateResultSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
    })
  );
}
export namespace BrowsingContext {
  export const GetTreeSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.getTree"),
      params: BrowsingContext.GetTreeParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const GetTreeParametersSchema = z.lazy(() =>
    z.object({
      maxDepth: JsUintSchema.optional(),
      root: BrowsingContext.BrowsingContextSchema.optional(),
    })
  );
}
export namespace BrowsingContext {
  export const GetTreeResultSchema = z.lazy(() =>
    z.object({
      contexts: BrowsingContext.InfoListSchema,
    })
  );
}
export namespace BrowsingContext {
  export const HandleUserPromptSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.handleUserPrompt"),
      params: BrowsingContext.HandleUserPromptParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const HandleUserPromptParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      accept: z.boolean().optional(),
      userText: z.string().optional(),
    })
  );
}
export namespace BrowsingContext {
  export const NavigateSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.navigate"),
      params: BrowsingContext.NavigateParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const NavigateParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      url: z.string(),
      wait: BrowsingContext.ReadinessStateSchema.optional(),
    })
  );
}
export namespace BrowsingContext {
  export const NavigateResultSchema = z.lazy(() =>
    z.object({
      navigation: z.union([BrowsingContext.NavigationSchema, z.null()]),
      url: z.string(),
    })
  );
}
export namespace BrowsingContext {
  export const PrintSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.print"),
      params: BrowsingContext.PrintParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const PrintParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      background: z.boolean().default(false).optional(),
      margin: BrowsingContext.PrintMarginParametersSchema.optional(),
      orientation: z
        .enum(["portrait", "landscape"])
        .default("portrait")
        .optional(),
      page: BrowsingContext.PrintPageParametersSchema.optional(),
      pageRanges: z.array(z.union([JsUintSchema, z.string()])).optional(),
      scale: z.literal(0.1).gte(0.1).lte(2).default(1).optional(),
      shrinkToFit: z.boolean().default(true).optional(),
    })
  );
}
export namespace BrowsingContext {
  export const PrintMarginParametersSchema = z.lazy(() =>
    z.object({
      bottom: z.number().gte(0).default(1).optional(),
      left: z.number().gte(0).default(1).optional(),
      right: z.number().gte(0).default(1).optional(),
      top: z.number().gte(0).default(1).optional(),
    })
  );
}
export namespace BrowsingContext {
  export const PrintPageParametersSchema = z.lazy(() =>
    z.object({
      height: z.number().gte(0).default(27.94).optional(),
      width: z.number().gte(0).default(21.59).optional(),
    })
  );
}
export namespace BrowsingContext {
  export const PrintResultSchema = z.lazy(() =>
    z.object({
      data: z.string(),
    })
  );
}
export namespace BrowsingContext {
  export const ReloadSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.reload"),
      params: BrowsingContext.ReloadParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const ReloadParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      ignoreCache: z.boolean().optional(),
      wait: BrowsingContext.ReadinessStateSchema.optional(),
    })
  );
}
export namespace BrowsingContext {
  export const SetViewportSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.setViewport"),
      params: BrowsingContext.SetViewportParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const SetViewportParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      viewport: z.union([BrowsingContext.ViewportSchema, z.null()]),
    })
  );
}
export namespace BrowsingContext {
  export const ViewportSchema = z.lazy(() =>
    z.object({
      width: JsUintSchema,
      height: JsUintSchema,
    })
  );
}
export namespace BrowsingContext {
  export const ContextCreatedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.contextCreated"),
      params: BrowsingContext.InfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const ContextDestroyedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.contextDestroyed"),
      params: BrowsingContext.InfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const NavigationStartedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.navigationStarted"),
      params: BrowsingContext.NavigationInfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const FragmentNavigatedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.fragmentNavigated"),
      params: BrowsingContext.NavigationInfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const DomContentLoadedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.domContentLoaded"),
      params: BrowsingContext.NavigationInfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const LoadSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.load"),
      params: BrowsingContext.NavigationInfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const DownloadWillBeginSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.downloadWillBegin"),
      params: BrowsingContext.NavigationInfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const NavigationAbortedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.navigationAborted"),
      params: BrowsingContext.NavigationInfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const NavigationFailedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.navigationFailed"),
      params: BrowsingContext.NavigationInfoSchema,
    })
  );
}
export namespace BrowsingContext {
  export const UserPromptClosedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.userPromptClosed"),
      params: BrowsingContext.UserPromptClosedParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const UserPromptClosedParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      accepted: z.boolean(),
      userText: z.string().optional(),
    })
  );
}
export namespace BrowsingContext {
  export const UserPromptOpenedSchema = z.lazy(() =>
    z.object({
      method: z.literal("browsingContext.userPromptOpened"),
      params: BrowsingContext.UserPromptOpenedParametersSchema,
    })
  );
}
export namespace BrowsingContext {
  export const UserPromptOpenedParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      type: z.union([
        z.literal("alert"),
        z.literal("confirm"),
        z.literal("prompt"),
        z.literal("beforeunload"),
      ]),
      message: z.string(),
    })
  );
}
export const NetworkCommandSchema = z.lazy(() => z.object({}));
export const NetworkResultSchema = z.lazy(() => z.object({}));
export const NetworkEventSchema = z.lazy(() =>
  z.union([
    Network.BeforeRequestSentSchema,
    Network.FetchErrorSchema,
    Network.ResponseStartedSchema,
    Network.ResponseCompletedSchema,
  ])
);
export namespace Network {
  export const BaseParametersSchema = z.lazy(() =>
    z.object({
      context: z.union([BrowsingContext.BrowsingContextSchema, z.null()]),
      navigation: z.union([BrowsingContext.NavigationSchema, z.null()]),
      redirectCount: JsUintSchema,
      request: Network.RequestDataSchema,
      timestamp: JsUintSchema,
    })
  );
}
export namespace Network {
  export const CookieSchema = z.lazy(() =>
    z.object({
      name: z.string(),
      value: z.string().optional(),
      binaryValue: z.tuple([z.number().int().nonnegative()]).optional(),
      domain: z.string(),
      path: z.string(),
      expires: JsUintSchema.optional(),
      size: JsUintSchema,
      httpOnly: z.boolean(),
      secure: z.boolean(),
      sameSite: z.union([
        z.literal("strict"),
        z.literal("lax"),
        z.literal("none"),
      ]),
    })
  );
}
export namespace Network {
  export const FetchTimingInfoSchema = z.lazy(() =>
    z.object({
      timeOrigin: z.number(),
      requestTime: z.number(),
      redirectStart: z.number(),
      redirectEnd: z.number(),
      fetchStart: z.number(),
      dnsStart: z.number(),
      dnsEnd: z.number(),
      connectStart: z.number(),
      connectEnd: z.number(),
      tlsStart: z.number(),
      requestStart: z.number(),
      responseStart: z.number(),
      responseEnd: z.number(),
    })
  );
}
export namespace Network {
  export const HeaderSchema = z.lazy(() =>
    z.object({
      name: z.string(),
      value: z.string().optional(),
      binaryValue: z.tuple([z.number().int().nonnegative()]).optional(),
    })
  );
}
export namespace Network {
  export const InitiatorSchema = z.lazy(() =>
    z.object({
      type: z.union([
        z.literal("parser"),
        z.literal("script"),
        z.literal("preflight"),
        z.literal("other"),
      ]),
      columnNumber: JsUintSchema.optional(),
      lineNumber: JsUintSchema.optional(),
      stackTrace: Script.StackTraceSchema.optional(),
      request: Network.RequestSchema.optional(),
    })
  );
}
export namespace Network {
  export const RequestSchema = z.lazy(() => z.string());
}
export namespace Network {
  export const RequestDataSchema = z.lazy(() =>
    z.object({
      request: Network.RequestSchema,
      url: z.string(),
      method: z.string(),
      headers: z.array(Network.HeaderSchema),
      cookies: z.array(Network.CookieSchema),
      headersSize: JsUintSchema,
      bodySize: z.union([JsUintSchema, z.null()]),
      timings: Network.FetchTimingInfoSchema,
    })
  );
}
export namespace Network {
  export const ResponseContentSchema = z.lazy(() =>
    z.object({
      size: JsUintSchema,
    })
  );
}
export namespace Network {
  export const ResponseDataSchema = z.lazy(() =>
    z.object({
      url: z.string(),
      protocol: z.string(),
      status: JsUintSchema,
      statusText: z.string(),
      fromCache: z.boolean(),
      headers: z.array(Network.HeaderSchema),
      mimeType: z.string(),
      bytesReceived: JsUintSchema,
      headersSize: z.union([JsUintSchema, z.null()]),
      bodySize: z.union([JsUintSchema, z.null()]),
      content: Network.ResponseContentSchema,
    })
  );
}
export namespace Network {
  export const BeforeRequestSentSchema = z.lazy(() =>
    z.object({
      method: z.literal("network.beforeRequestSent"),
      params: Network.BeforeRequestSentParametersSchema,
    })
  );
}
export namespace Network {
  export const BeforeRequestSentParametersSchema = z.lazy(() =>
    Network.BaseParametersSchema.and(
      z.object({
        initiator: Network.InitiatorSchema,
      })
    )
  );
}
export namespace Network {
  export const FetchErrorSchema = z.lazy(() =>
    z.object({
      method: z.literal("network.fetchError"),
      params: Network.FetchErrorParametersSchema,
    })
  );
}
export namespace Network {
  export const FetchErrorParametersSchema = z.lazy(() =>
    Network.BaseParametersSchema.and(
      z.object({
        errorText: z.string(),
      })
    )
  );
}
export namespace Network {
  export const ResponseCompletedSchema = z.lazy(() =>
    z.object({
      method: z.literal("network.responseCompleted"),
      params: Network.ResponseCompletedParametersSchema,
    })
  );
}
export namespace Network {
  export const ResponseCompletedParametersSchema = z.lazy(() =>
    Network.BaseParametersSchema.and(
      z.object({
        response: Network.ResponseDataSchema,
      })
    )
  );
}
export namespace Network {
  export const ResponseStartedSchema = z.lazy(() =>
    z.object({
      method: z.literal("network.responseStarted"),
      params: Network.ResponseStartedParametersSchema,
    })
  );
}
export namespace Network {
  export const ResponseStartedParametersSchema = z.lazy(() =>
    Network.BaseParametersSchema.and(
      z.object({
        response: Network.ResponseDataSchema,
      })
    )
  );
}
export const ScriptCommandSchema = z.lazy(() =>
  z.union([
    Script.AddPreloadScriptCommandSchema,
    Script.CallFunctionSchema,
    Script.DisownSchema,
    Script.EvaluateSchema,
    Script.GetRealmsSchema,
    Script.RemovePreloadScriptCommandSchema,
  ])
);
export const ScriptResultSchema = z.lazy(() =>
  z.union([
    Script.AddPreloadScriptResultSchema,
    Script.EvaluateResultSchema,
    Script.GetRealmsResultSchema,
  ])
);
export const ScriptEventSchema = z.lazy(() =>
  z.union([Script.RealmCreatedSchema, Script.RealmDestroyedSchema])
);
export namespace Script {
  export const ChannelSchema = z.lazy(() => z.string());
}
export namespace Script {
  export const ChannelValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("channel"),
      value: Script.ChannelPropertiesSchema,
    })
  );
}
export namespace Script {
  export const ChannelPropertiesSchema = z.lazy(() =>
    z.object({
      channel: Script.ChannelSchema,
      serializationOptions: Script.SerializationOptionsSchema.optional(),
      ownership: Script.ResultOwnershipSchema.optional(),
    })
  );
}
export namespace Script {
  export const EvaluateResultSchema = z.lazy(() =>
    z.union([
      Script.EvaluateResultSuccessSchema,
      Script.EvaluateResultExceptionSchema,
    ])
  );
}
export namespace Script {
  export const EvaluateResultSuccessSchema = z.lazy(() =>
    z.object({
      type: z.literal("success"),
      result: Script.RemoteValueSchema,
      realm: Script.RealmSchema,
    })
  );
}
export namespace Script {
  export const EvaluateResultExceptionSchema = z.lazy(() =>
    z.object({
      type: z.literal("exception"),
      exceptionDetails: Script.ExceptionDetailsSchema,
      realm: Script.RealmSchema,
    })
  );
}
export namespace Script {
  export const ExceptionDetailsSchema = z.lazy(() =>
    z.object({
      columnNumber: JsUintSchema,
      exception: Script.RemoteValueSchema,
      lineNumber: JsUintSchema,
      stackTrace: Script.StackTraceSchema,
      text: z.string(),
    })
  );
}
export namespace Script {
  export const HandleSchema = z.lazy(() => z.string());
}
export namespace Script {
  export const LocalValueSchema = z.lazy(() =>
    z.union([
      Script.PrimitiveProtocolValueSchema,
      Script.ArrayLocalValueSchema,
      Script.DateLocalValueSchema,
      Script.MapLocalValueSchema,
      Script.ObjectLocalValueSchema,
      Script.RegExpLocalValueSchema,
      Script.SetLocalValueSchema,
    ])
  );
}
export namespace Script {
  export const ListLocalValueSchema = z.lazy(() =>
    z.array(Script.LocalValueSchema)
  );
}
export namespace Script {
  export const ArrayLocalValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("array"),
      value: Script.ListLocalValueSchema,
    })
  );
}
export namespace Script {
  export const DateLocalValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("date"),
      value: z.string(),
    })
  );
}
export namespace Script {
  export const MappingLocalValueSchema = z.lazy(() =>
    z.array(
      z.tuple([
        z.union([Script.LocalValueSchema, z.string()]),
        Script.LocalValueSchema,
      ])
    )
  );
}
export namespace Script {
  export const MapLocalValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("map"),
      value: Script.MappingLocalValueSchema,
    })
  );
}
export namespace Script {
  export const ObjectLocalValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("object"),
      value: Script.MappingLocalValueSchema,
    })
  );
}
export namespace Script {
  export const RegExpValueSchema = z.lazy(() =>
    z.object({
      pattern: z.string(),
      flags: z.string().optional(),
    })
  );
}
export namespace Script {
  export const RegExpLocalValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("regexp"),
      value: Script.RegExpValueSchema,
    })
  );
}
export namespace Script {
  export const SetLocalValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("set"),
      value: Script.ListLocalValueSchema,
    })
  );
}
export namespace Script {
  export const PreloadScriptSchema = z.lazy(() => z.string());
}
export namespace Script {
  export const RealmSchema = z.lazy(() => z.string());
}
export namespace Script {
  export const PrimitiveProtocolValueSchema = z.lazy(() =>
    z.union([
      Script.UndefinedValueSchema,
      Script.NullValueSchema,
      Script.StringValueSchema,
      Script.NumberValueSchema,
      Script.BooleanValueSchema,
      Script.BigIntValueSchema,
    ])
  );
}
export namespace Script {
  export const UndefinedValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("undefined"),
    })
  );
}
export namespace Script {
  export const NullValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("null"),
    })
  );
}
export namespace Script {
  export const StringValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("string"),
      value: z.string(),
    })
  );
}
export namespace Script {
  export const SpecialNumberSchema = z.lazy(() =>
    z.enum(["NaN", "-0", "Infinity", "-Infinity"])
  );
}
export namespace Script {
  export const NumberValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("number"),
      value: z.union([z.number(), Script.SpecialNumberSchema]),
    })
  );
}
export namespace Script {
  export const BooleanValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("boolean"),
      value: z.boolean(),
    })
  );
}
export namespace Script {
  export const BigIntValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("bigint"),
      value: z.string(),
    })
  );
}
export namespace Script {
  export const RealmInfoSchema = z.lazy(() =>
    z.union([
      Script.WindowRealmInfoSchema,
      Script.DedicatedWorkerRealmInfoSchema,
      Script.SharedWorkerRealmInfoSchema,
      Script.ServiceWorkerRealmInfoSchema,
      Script.WorkerRealmInfoSchema,
      Script.PaintWorkletRealmInfoSchema,
      Script.AudioWorkletRealmInfoSchema,
      Script.WorkletRealmInfoSchema,
    ])
  );
}
export namespace Script {
  export const BaseRealmInfoSchema = z.lazy(() =>
    z.object({
      realm: Script.RealmSchema,
      origin: z.string(),
    })
  );
}
export namespace Script {
  export const WindowRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("window"),
        context: BrowsingContext.BrowsingContextSchema,
        sandbox: z.string().optional(),
      })
    )
  );
}
export namespace Script {
  export const DedicatedWorkerRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("dedicated-worker"),
      })
    )
  );
}
export namespace Script {
  export const SharedWorkerRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("shared-worker"),
      })
    )
  );
}
export namespace Script {
  export const ServiceWorkerRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("service-worker"),
      })
    )
  );
}
export namespace Script {
  export const WorkerRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("worker"),
      })
    )
  );
}
export namespace Script {
  export const PaintWorkletRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("paint-worklet"),
      })
    )
  );
}
export namespace Script {
  export const AudioWorkletRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("audio-worklet"),
      })
    )
  );
}
export namespace Script {
  export const WorkletRealmInfoSchema = z.lazy(() =>
    Script.BaseRealmInfoSchema.and(
      z.object({
        type: z.literal("worklet"),
      })
    )
  );
}
export namespace Script {
  export const RealmTypeSchema = z.lazy(() =>
    z.enum([
      "window",
      "dedicated-worker",
      "shared-worker",
      "service-worker",
      "worker",
      "paint-worklet",
      "audio-worklet",
      "worklet",
    ])
  );
}
export namespace Script {
  export const RemoteReferenceSchema = z.lazy(() =>
    z.union([Script.SharedReferenceSchema, Script.RemoteObjectReferenceSchema])
  );
}
export namespace Script {
  export const SharedReferenceSchema = z.lazy(() =>
    z
      .object({
        sharedId: Script.SharedIdSchema,
        handle: Script.HandleSchema.optional(),
      })
      .and(ExtensibleSchema)
  );
}
export namespace Script {
  export const RemoteObjectReferenceSchema = z.lazy(() =>
    z
      .object({
        handle: Script.HandleSchema,
        sharedId: Script.SharedIdSchema.optional(),
      })
      .and(ExtensibleSchema)
  );
}
export namespace Script {
  export const RemoteValueSchema = z.lazy(() =>
    z.union([
      Script.PrimitiveProtocolValueSchema,
      Script.SymbolRemoteValueSchema,
      Script.ArrayRemoteValueSchema,
      Script.ObjectRemoteValueSchema,
      Script.FunctionRemoteValueSchema,
      Script.RegExpRemoteValueSchema,
      Script.DateRemoteValueSchema,
      Script.MapRemoteValueSchema,
      Script.SetRemoteValueSchema,
      Script.WeakMapRemoteValueSchema,
      Script.WeakSetRemoteValueSchema,
      Script.IteratorRemoteValueSchema,
      Script.GeneratorRemoteValueSchema,
      Script.ErrorRemoteValueSchema,
      Script.ProxyRemoteValueSchema,
      Script.PromiseRemoteValueSchema,
      Script.TypedArrayRemoteValueSchema,
      Script.ArrayBufferRemoteValueSchema,
      Script.NodeListRemoteValueSchema,
      Script.HtmlCollectionRemoteValueSchema,
      Script.NodeRemoteValueSchema,
      Script.WindowProxyRemoteValueSchema,
    ])
  );
}
export namespace Script {
  export const InternalIdSchema = z.lazy(() => JsUintSchema);
}
export namespace Script {
  export const ListRemoteValueSchema = z.lazy(() =>
    z.array(Script.RemoteValueSchema)
  );
}
export namespace Script {
  export const MappingRemoteValueSchema = z.lazy(() =>
    z.array(
      z.tuple([
        z.union([Script.RemoteValueSchema, z.string()]),
        Script.RemoteValueSchema,
      ])
    )
  );
}
export namespace Script {
  export const SymbolRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("symbol"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const ArrayRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("array"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
      value: Script.ListRemoteValueSchema.optional(),
    })
  );
}
export namespace Script {
  export const ObjectRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("object"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
      value: Script.MappingRemoteValueSchema.optional(),
    })
  );
}
export namespace Script {
  export const FunctionRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("function"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const RegExpRemoteValueSchema = z.lazy(() =>
    z
      .object({
        handle: Script.HandleSchema.optional(),
        internalId: Script.InternalIdSchema.optional(),
      })
      .and(Script.RegExpLocalValueSchema)
  );
}
export namespace Script {
  export const DateRemoteValueSchema = z.lazy(() =>
    z
      .object({
        handle: Script.HandleSchema.optional(),
        internalId: Script.InternalIdSchema.optional(),
      })
      .and(Script.DateLocalValueSchema)
  );
}
export namespace Script {
  export const MapRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("map"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
      value: Script.MappingRemoteValueSchema.optional(),
    })
  );
}
export namespace Script {
  export const SetRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("set"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
      value: Script.ListRemoteValueSchema.optional(),
    })
  );
}
export namespace Script {
  export const WeakMapRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("weakmap"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const WeakSetRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("weakset"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const IteratorRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("iterator"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const GeneratorRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("generator"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const ErrorRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("error"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const ProxyRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("proxy"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const PromiseRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("promise"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const TypedArrayRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("typedarray"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const ArrayBufferRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("arraybuffer"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const NodeListRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("nodelist"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
      value: Script.ListRemoteValueSchema.optional(),
    })
  );
}
export namespace Script {
  export const HtmlCollectionRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("htmlcollection"),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
      value: Script.ListRemoteValueSchema.optional(),
    })
  );
}
export namespace Script {
  export const NodeRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("node"),
      sharedId: Script.SharedIdSchema.optional(),
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
      value: Script.NodePropertiesSchema.optional(),
    })
  );
}
export namespace Script {
  export const NodePropertiesSchema = z.lazy(() =>
    z.object({
      nodeType: JsUintSchema,
      childNodeCount: JsUintSchema,
      attributes: z.record(z.string(), z.string()).optional(),
      children: z.array(Script.NodeRemoteValueSchema).optional(),
      localName: z.string().optional(),
      mode: z.union([z.literal("open"), z.literal("closed")]).optional(),
      namespaceURI: z.string().optional(),
      nodeValue: z.string().optional(),
      shadowRoot: z.union([Script.NodeRemoteValueSchema, z.null()]).optional(),
    })
  );
}
export namespace Script {
  export const WindowProxyRemoteValueSchema = z.lazy(() =>
    z.object({
      type: z.literal("window"),
      value: Script.WindowProxyPropertiesSchema,
      handle: Script.HandleSchema.optional(),
      internalId: Script.InternalIdSchema.optional(),
    })
  );
}
export namespace Script {
  export const WindowProxyPropertiesSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
    })
  );
}
export namespace Script {
  export const ResultOwnershipSchema = z.lazy(() => z.enum(["root", "none"]));
}
export namespace Script {
  export const SerializationOptionsSchema = z.lazy(() =>
    z.object({
      maxDomDepth: z.union([JsUintSchema, z.null()]).default(0).optional(),
      maxObjectDepth: z
        .union([JsUintSchema, z.null()])
        .default(null)
        .optional(),
      includeShadowTree: z
        .enum(["none", "open", "all"])
        .default("none")
        .optional(),
    })
  );
}
export namespace Script {
  export const SharedIdSchema = z.lazy(() => z.string());
}
export namespace Script {
  export const StackFrameSchema = z.lazy(() =>
    z.object({
      columnNumber: JsUintSchema,
      functionName: z.string(),
      lineNumber: JsUintSchema,
      url: z.string(),
    })
  );
}
export namespace Script {
  export const StackTraceSchema = z.lazy(() =>
    z.object({
      callFrames: z.array(Script.StackFrameSchema),
    })
  );
}
export namespace Script {
  export const SourceSchema = z.lazy(() =>
    z.object({
      realm: Script.RealmSchema,
      context: BrowsingContext.BrowsingContextSchema.optional(),
    })
  );
}
export namespace Script {
  export const RealmTargetSchema = z.lazy(() =>
    z.object({
      realm: Script.RealmSchema,
    })
  );
}
export namespace Script {
  export const ContextTargetSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      sandbox: z.string().optional(),
    })
  );
}
export namespace Script {
  export const TargetSchema = z.lazy(() =>
    z.union([Script.RealmTargetSchema, Script.ContextTargetSchema])
  );
}
export namespace Script {
  export const AddPreloadScriptCommandSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.addPreloadScript"),
      params: Script.AddPreloadScriptParametersSchema,
    })
  );
}
export namespace Script {
  export const AddPreloadScriptParametersSchema = z.lazy(() =>
    z.object({
      functionDeclaration: z.string(),
      arguments: z.array(Script.ChannelValueSchema).optional(),
      sandbox: z.string().optional(),
    })
  );
}
export namespace Script {
  export const AddPreloadScriptResultSchema = z.lazy(() =>
    z.object({
      script: Script.PreloadScriptSchema,
    })
  );
}
export namespace Script {
  export const DisownSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.disown"),
      params: Script.DisownParametersSchema,
    })
  );
}
export namespace Script {
  export const DisownParametersSchema = z.lazy(() =>
    z.object({
      handles: z.tuple([Script.HandleSchema]),
      target: Script.TargetSchema,
    })
  );
}
export namespace Script {
  export const CallFunctionSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.callFunction"),
      params: Script.CallFunctionParametersSchema,
    })
  );
}
export namespace Script {
  export const CallFunctionParametersSchema = z.lazy(() =>
    z.object({
      functionDeclaration: z.string(),
      awaitPromise: z.boolean(),
      target: Script.TargetSchema,
      arguments: z.array(Script.ArgumentValueSchema).optional(),
      resultOwnership: Script.ResultOwnershipSchema.optional(),
      serializationOptions: Script.SerializationOptionsSchema.optional(),
      this: Script.ArgumentValueSchema.optional(),
    })
  );
}
export namespace Script {
  export const ArgumentValueSchema = z.lazy(() =>
    z.union([
      Script.RemoteReferenceSchema,
      Script.LocalValueSchema,
      Script.ChannelValueSchema,
    ])
  );
}
export namespace Script {
  export const EvaluateSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.evaluate"),
      params: Script.EvaluateParametersSchema,
    })
  );
}
export namespace Script {
  export const EvaluateParametersSchema = z.lazy(() =>
    z.object({
      expression: z.string(),
      target: Script.TargetSchema,
      awaitPromise: z.boolean(),
      resultOwnership: Script.ResultOwnershipSchema.optional(),
      serializationOptions: Script.SerializationOptionsSchema.optional(),
    })
  );
}
export namespace Script {
  export const GetRealmsSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.getRealms"),
      params: Script.GetRealmsParametersSchema,
    })
  );
}
export namespace Script {
  export const GetRealmsParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema.optional(),
      type: Script.RealmTypeSchema.optional(),
    })
  );
}
export namespace Script {
  export const GetRealmsResultSchema = z.lazy(() =>
    z.object({
      realms: z.array(Script.RealmInfoSchema),
    })
  );
}
export namespace Script {
  export const RemovePreloadScriptCommandSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.removePreloadScript"),
      params: Script.RemovePreloadScriptParametersSchema,
    })
  );
}
export namespace Script {
  export const RemovePreloadScriptParametersSchema = z.lazy(() =>
    z.object({
      script: Script.PreloadScriptSchema,
    })
  );
}
export namespace Script {
  export const MessageSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.message"),
      params: Script.MessageParametersSchema,
    })
  );
}
export namespace Script {
  export const MessageParametersSchema = z.lazy(() =>
    z.object({
      channel: Script.ChannelSchema,
      data: Script.RemoteValueSchema,
      source: Script.SourceSchema,
    })
  );
}
export namespace Script {
  export const RealmCreatedSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.realmCreated"),
      params: Script.RealmInfoSchema,
    })
  );
}
export namespace Script {
  export const RealmDestroyedSchema = z.lazy(() =>
    z.object({
      method: z.literal("script.realmDestoyed"),
      params: Script.RealmDestroyedParametersSchema,
    })
  );
}
export namespace Script {
  export const RealmDestroyedParametersSchema = z.lazy(() =>
    z.object({
      realm: Script.RealmSchema,
    })
  );
}
export const LogEventSchema = z.lazy(() => Log.EntryAddedSchema);
export namespace Log {
  export const LevelSchema = z.lazy(() =>
    z.enum(["debug", "info", "warn", "error"])
  );
}
export namespace Log {
  export const EntrySchema = z.lazy(() =>
    z.union([
      Log.GenericLogEntrySchema,
      Log.ConsoleLogEntrySchema,
      Log.JavascriptLogEntrySchema,
    ])
  );
}
export namespace Log {
  export const BaseLogEntrySchema = z.lazy(() =>
    z.object({
      level: Log.LevelSchema,
      source: Script.SourceSchema,
      text: z.union([z.string(), z.null()]),
      timestamp: JsUintSchema,
      stackTrace: Script.StackTraceSchema.optional(),
    })
  );
}
export namespace Log {
  export const GenericLogEntrySchema = z.lazy(() =>
    Log.BaseLogEntrySchema.and(
      z.object({
        type: z.string(),
      })
    )
  );
}
export namespace Log {
  export const ConsoleLogEntrySchema = z.lazy(() =>
    Log.BaseLogEntrySchema.and(
      z.object({
        type: z.literal("console"),
        method: z.string(),
        args: z.array(Script.RemoteValueSchema),
      })
    )
  );
}
export namespace Log {
  export const JavascriptLogEntrySchema = z.lazy(() =>
    Log.BaseLogEntrySchema.and(
      z.object({
        type: z.literal("javascript"),
      })
    )
  );
}
export namespace Log {
  export const EntryAddedSchema = z.lazy(() =>
    z.object({
      method: z.literal("log.entryAdded"),
      params: Log.EntrySchema,
    })
  );
}
export const InputCommandSchema = z.lazy(() =>
  z.union([Input.PerformActionsSchema, Input.ReleaseActionsSchema])
);
export namespace Input {
  export const ElementOriginSchema = z.lazy(() =>
    z.object({
      type: z.literal("element"),
      element: Script.SharedReferenceSchema,
    })
  );
}
export namespace Input {
  export const PerformActionsSchema = z.lazy(() =>
    z.object({
      method: z.literal("input.performActions"),
      params: Input.PerformActionsParametersSchema,
    })
  );
}
export namespace Input {
  export const PerformActionsParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
      actions: z.array(Input.SourceActionsSchema),
    })
  );
}
export namespace Input {
  export const SourceActionsSchema = z.lazy(() =>
    z.union([
      Input.NoneSourceActionsSchema,
      Input.KeySourceActionsSchema,
      Input.PointerSourceActionsSchema,
      Input.WheelSourceActionsSchema,
    ])
  );
}
export namespace Input {
  export const NoneSourceActionsSchema = z.lazy(() =>
    z.object({
      type: z.literal("none"),
      id: z.string(),
      actions: z.array(Input.NoneSourceActionSchema),
    })
  );
}
export namespace Input {
  export const NoneSourceActionSchema = z.lazy(() => Input.PauseActionSchema);
}
export namespace Input {
  export const KeySourceActionsSchema = z.lazy(() =>
    z.object({
      type: z.literal("key"),
      id: z.string(),
      actions: z.array(Input.KeySourceActionSchema),
    })
  );
}
export namespace Input {
  export const KeySourceActionSchema = z.lazy(() =>
    z.union([
      Input.PauseActionSchema,
      Input.KeyDownActionSchema,
      Input.KeyUpActionSchema,
    ])
  );
}
export namespace Input {
  export const PointerSourceActionsSchema = z.lazy(() =>
    z.object({
      type: z.literal("pointer"),
      id: z.string(),
      parameters: Input.PointerParametersSchema.optional(),
      actions: z.array(Input.PointerSourceActionSchema),
    })
  );
}
export namespace Input {
  export const PointerTypeSchema = z.lazy(() =>
    z.enum(["mouse", "pen", "touch"])
  );
}
export namespace Input {
  export const PointerParametersSchema = z.lazy(() =>
    z.object({
      pointerType: Input.PointerTypeSchema.default("mouse").optional(),
    })
  );
}
export namespace Input {
  export const PointerSourceActionSchema = z.lazy(() =>
    z.union([
      Input.PauseActionSchema,
      Input.PointerDownActionSchema,
      Input.PointerUpActionSchema,
      Input.PointerMoveActionSchema,
    ])
  );
}
export namespace Input {
  export const WheelSourceActionsSchema = z.lazy(() =>
    z.object({
      type: z.literal("wheel"),
      id: z.string(),
      actions: z.array(Input.WheelSourceActionSchema),
    })
  );
}
export namespace Input {
  export const WheelSourceActionSchema = z.lazy(() =>
    z.union([Input.PauseActionSchema, Input.WheelScrollActionSchema])
  );
}
export namespace Input {
  export const PauseActionSchema = z.lazy(() =>
    z.object({
      type: z.literal("pause"),
      duration: JsUintSchema.optional(),
    })
  );
}
export namespace Input {
  export const KeyDownActionSchema = z.lazy(() =>
    z.object({
      type: z.literal("keyDown"),
      value: z.string(),
    })
  );
}
export namespace Input {
  export const KeyUpActionSchema = z.lazy(() =>
    z.object({
      type: z.literal("keyUp"),
      value: z.string(),
    })
  );
}
export namespace Input {
  export const PointerUpActionSchema = z.lazy(() =>
    z
      .object({
        type: z.literal("pointerUp"),
        button: JsUintSchema,
      })
      .and(Input.PointerCommonPropertiesSchema)
  );
}
export namespace Input {
  export const PointerDownActionSchema = z.lazy(() =>
    z
      .object({
        type: z.literal("pointerDown"),
        button: JsUintSchema,
      })
      .and(Input.PointerCommonPropertiesSchema)
  );
}
export namespace Input {
  export const PointerMoveActionSchema = z.lazy(() =>
    z
      .object({
        type: z.literal("pointerMove"),
        x: JsIntSchema,
        y: JsIntSchema,
        duration: JsUintSchema.optional(),
        origin: Input.OriginSchema.optional(),
      })
      .and(Input.PointerCommonPropertiesSchema)
  );
}
export namespace Input {
  export const WheelScrollActionSchema = z.lazy(() =>
    z.object({
      type: z.literal("scroll"),
      x: JsIntSchema,
      y: JsIntSchema,
      deltaX: JsIntSchema,
      deltaY: JsIntSchema,
      duration: JsUintSchema.optional(),
      origin: Input.OriginSchema.default("viewport").optional(),
    })
  );
}
export namespace Input {
  export const PointerCommonPropertiesSchema = z.lazy(() =>
    z
      .object({
        width: JsUintSchema.default(1).optional(),
        height: JsUintSchema.default(1).optional(),
        pressure: z.number().default(0).optional(),
        tangentialPressure: z.number().default(0).optional(),
        twist: z.literal(0).gte(0).lte(359).default(0).optional(),
      })
      .and(z.union([Input.TiltPropertiesSchema, Input.AnglePropertiesSchema]))
  );
}
export namespace Input {
  export const AnglePropertiesSchema = z.lazy(() =>
    z.object({
      altitudeAngle: z.number().default(0).optional(),
      azimuthAngle: z.number().default(0).optional(),
    })
  );
}
export namespace Input {
  export const TiltPropertiesSchema = z.lazy(() =>
    z.object({
      tiltX: z.literal(-90).gte(-90).lte(90).default(0).optional(),
      tiltY: z.literal(-90).gte(-90).lte(90).default(0).optional(),
    })
  );
}
export namespace Input {
  export const OriginSchema = z.lazy(() =>
    z.union([
      z.literal("viewport"),
      z.literal("pointer"),
      Input.ElementOriginSchema,
    ])
  );
}
export namespace Input {
  export const ReleaseActionsSchema = z.lazy(() =>
    z.object({
      method: z.literal("input.releaseActions"),
      params: Input.ReleaseActionsParametersSchema,
    })
  );
}
export namespace Input {
  export const ReleaseActionsParametersSchema = z.lazy(() =>
    z.object({
      context: BrowsingContext.BrowsingContextSchema,
    })
  );
}
