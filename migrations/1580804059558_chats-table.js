exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('chats', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      userId: {
        type: 'integer',
        notNull: true,
        references: '"users"', 
      },
      content: {
        type: 'text',
      },
    });
  };

exports.down = pgm => {};