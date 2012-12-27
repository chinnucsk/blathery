-module(message_store).

-export([init_tables/0, store_message/3]).

-record(blathery_messages, {date,
                            name,
                            message}).

init_tables() ->
  mnesia:create_table(blathery_messages, [{attributes, record_info(fields, blathery_messages)}]).

store_message(Date, Sender, Message) ->
  Num_Sec = calendar:datetime_to_gregorian_seconds(Date),
  F = fun() ->
    mnesia:write(#blathery_messages{date=Num_Sec,
                                    name=Sender,
                                    message=Message})
  end,
  mnesia:activity(transaction, F).

retrieve_messages_after(Date) ->
  undefined.

retrieve_last_n_messages(N) ->
  undefined.