import { Dispatch } from '../structures/Dispatch';
import { InteractionFactory } from '../util/InteractionFactory';

export default new Dispatch({
  name: 'INTERACTION_CREATE',

  async run(c, d) {
    const interaction = InteractionFactory.create(c, d);

    if (!interaction) return;

    const command = c.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(interaction);
    } catch (error) {
      console.error(`Error running command ${interaction.commandName}:`, error);
    }
  }
});
