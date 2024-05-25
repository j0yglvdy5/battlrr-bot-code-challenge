import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then((response) => response.json())
      .then((data) => setBots(data));
  }, []);

  const addToArmy = (bot) => {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  const removeFromArmy = (bot) => {
    setArmy(army.filter((b) => b.id !== bot.id));
  };

  const deleteBot = (botId) => {
    fetch(`http://localhost:8002/bots/${botId}`, {
      method: "DELETE",
    }).then(() => {
      setBots(bots.filter((bot) => bot.id !== botId));
      setArmy(army.filter((bot) => bot.id !== botId));
    });
  };

  const handleBotClick = (bot) => {
    setSelectedBot(bot);
  };

  const goBack = () => {
    setSelectedBot(null);
  };

  return (
    <div>
      {selectedBot ? (
        <BotSpecs bot={selectedBot} goBack={goBack} enlistBot={addToArmy} />
      ) : (
        <>
          <YourBotArmy bots={army} removeFromArmy={removeFromArmy} deleteBot={deleteBot} />
          <BotCollection bots={bots} addToArmy={handleBotClick} deleteBot={deleteBot} />
        </>
      )}
    </div>
  );
}

export default BotsPage;
