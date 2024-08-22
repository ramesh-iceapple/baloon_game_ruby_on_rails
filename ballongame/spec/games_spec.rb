# spec/requests/games_spec.rb
require 'rails_helper'

RSpec.describe "Games API", type: :request do
  # Test for GET /games
  describe "GET /api/v1/games" do
    before do
      # Create a few games to test the index action
      create_list(:game, 5)
    end

    it "returns all games" do
      get '/api/v1/games'

      expect(response).to have_http_status(:success) # Expect a 200 OK status
      expect(JSON.parse(response.body).size).to eq(7) # Check the number of games returned
    end
  end

  # Test for GET /games/:id
  describe "GET /games/:id" do
    let!(:game) { create(:game) } # Create a game to test the show action

    it "returns the game" do
      get "/api/v1/games/#{game.id}"

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(game.id)
    end

    it "returns a 404 if the game does not exist" do
      get "/api/v1/games/999"

      expect(response).to have_http_status(:not_found) # Expect a 404 Not Found status
    end
  end

  # Test for DESTROY /games/:id
  describe "DESTROY /games/:id" do
    let!(:game) { create(:game) } # Create a game to test the show action

    it "delete the game" do
      delete "/api/v1/games/#{game.id}"

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(game.id)

      get "/api/v1/games/#{game.id}"

      expect(response).to have_http_status(:not_found) # Expect a 404 Not Found status
    end
  end

  # Test for POST /games/:id
  # describe "POST /games", type: :request do
  #   let(:valid_attributes) { { playerName: "Nagi", score: 10} }

  #   it "creates a new game" do
  #     expect {
  #       post "/api/v1/games", params: valid_attributes
  #     }.to change(games, :count).by(1)

  #     json_response = JSON.parse(response.body)
  #     expect(json_response['playerName']).to eq("Nagi")
  #     expect(json_response['score']).to eq(10)  # Check the author field
  #   end
  # end
end