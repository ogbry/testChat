exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('chats', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      name: {
        type: 'text',
        notNull: true,
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