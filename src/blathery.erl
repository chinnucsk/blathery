%% @author author <author@example.com>
%% @copyright YYYY author.

%% @doc blathery startup code

-module(blathery).
-author('author <author@example.com>').
-export([start/0, start_link/0, stop/0]).

ensure_started(App) ->
    case application:start(App) of
        ok ->
            ok;
        {error, {already_started, App}} ->
            ok
    end.

%% @spec start_link() -> {ok,Pid::pid()}
%% @doc Starts the app for inclusion in a supervisor tree
start_link() ->
    ensure_started(inets),
    ensure_started(crypto),
    ensure_started(mochiweb),
    ensure_started(mnesia),
    application:set_env(webmachine, webmachine_logger_module, 
                        webmachine_logger),
    ensure_started(webmachine),
    blathery_sup:start_link().

%% @spec start() -> ok
%% @doc Start the blathery server.
start() ->
    ensure_started(inets),
    ensure_started(crypto),
    ensure_started(mochiweb),
    ensure_started(mnesia),
    application:set_env(webmachine, webmachine_logger_module, 
                        webmachine_logger),
    ensure_started(webmachine),
    application:start(blathery).

%% @spec stop() -> ok
%% @doc Stop the blathery server.
stop() ->
    Res = application:stop(blathery),
    application:stop(webmachine),
    application:stop(mochiweb),
    application:stop(mnesia),
    application:stop(crypto),
    application:stop(inets),
    Res.
