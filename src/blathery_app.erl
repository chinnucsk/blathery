%% @author author <author@example.com>
%% @copyright YYYY author.

%% @doc Callbacks for the blathery application.

-module(blathery_app).
-author('author <author@example.com>').

-behaviour(application).
-export([start/2,stop/1]).


%% @spec start(_Type, _StartArgs) -> ServerRet
%% @doc application start callback for blathery.
start(_Type, _StartArgs) ->
    blathery_sup:start_link().

%% @spec stop(_State) -> ServerRet
%% @doc application stop callback for blathery.
stop(_State) ->
    ok.
