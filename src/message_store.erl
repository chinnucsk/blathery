-module(message_store).

-export([init_tables/0, store_message/3, retrieve_messages_before/1]).

-include_lib("stdlib/include/qlc.hrl").

-record(blathery_messages, {date,
                            name,
                            message}).

init_tables() ->
  mnesia:create_table(blathery_messages, [{attributes, record_info(fields, blathery_messages)},
                                          {type, bag}]).

store_message(Date, Sender, Message) ->
  io:format("Storing message: date=~p , sender=~p , message=~p~n", [Date, Sender, Message]),
  Num_Sec = calendar:datetime_to_gregorian_seconds(Date),
  F = fun() ->
    mnesia:write(#blathery_messages{date=Num_Sec,
                                    name=Sender,
                                    message=Message})
  end,
  mnesia:activity(transaction, F).

retrieve_messages_before(Date) ->
  Num_Sec = calendar:datetime_to_gregorian_seconds(Date),
  F = fun() ->
    qlc:eval(qlc:q(
      [{struct, [{name, S},{chat, M},{time, D}]} || #blathery_messages{date=D,
                                   name=S,
                                   message=M} <- mnesia:table(blathery_messages),
                 D =< Num_Sec]
    ))
  end,
  %lists:sort([{V,K} || {K,V} <- dict:to_list(mnesia:activity(transaction, F))]).
  SortFun = fun({_, [_,_,{time,Val1}]}, {_, [_,_,{time,Val2}]}) -> Val1 < Val2 end,
  lists:sort(SortFun, mnesia:activity(transaction, F)).

retrieve_last_n_messages(N) ->
  undefined.