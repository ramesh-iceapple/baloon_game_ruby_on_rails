json.extract! game, :id, :playerName, :score, :created_at, :updated_at
json.url game_url(game, format: :json)
