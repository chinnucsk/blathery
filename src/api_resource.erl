-module(api_resource).
-export([init/1, allowed_methods/2, content_types_provided/2, to_json/2]).

-include_lib("webmachine/include/webmachine.hrl").

init([]) -> {ok, undefined}.

allowed_methods(RD, Ctx) ->
  {['GET', 'HEAD'], RD, Ctx}.

content_types_provided(ReqData, Ctx) ->
  {[ {"application/json", to_json} ], ReqData, Ctx}.

to_json(RD, Ctx) ->
  Resp = mochijson:encode({struct, [
                            {name, "some guy"},
                            {chat, "blah blah blah"}
                          ]}),
  {Resp, RD, Ctx}.
