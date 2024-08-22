class CreateGames < ActiveRecord::Migration[7.2]
  def change
    create_table :games do |t|
      t.string :playerName
      t.string :score

      t.timestamps
    end
  end
end
