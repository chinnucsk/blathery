%% @author author <author@example.com>
%% @copyright YYYY author.
%% @doc Example webmachine_resource.

-module(blathery_resource).
-export([init/1, to_html/2]).

-include_lib("webmachine/include/webmachine.hrl").

init([]) -> 
  message_store:init_tables(),
  {ok, undefined}.

to_html(ReqData, State) ->
    {get_start_page(), ReqData, State}.

get_start_page() ->
  "<html>"
    "<head>"
      "<title>Welcome to Blathery!</title>"
      "<link rel=\"stylesheet\" type=\"text/css\" href=\"static/extjs/resources/css/ext-all.css\" />"
      "<script type=\"text/javascript\" src=\"static/extjs/ext-all-debug-w-comments.js\"></script>"
      "<script type=\"text/javascript\" src=\"static/blathery/js/MessageGrid.js\"></script>"
      "<script type=\"text/javascript\" src=\"static/blathery/js/InputPanel.js\"></script>"
      "<script type=\"text/javascript\" src=\"static/blathery/js/Application.js\"></script>"
    "</head>"
    "<body>"
      "<div id=\"app-cmp\"></div>"
    "</body>"
  "</html>".