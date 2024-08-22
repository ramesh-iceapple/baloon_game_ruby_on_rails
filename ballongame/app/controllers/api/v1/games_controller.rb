class Api::V1::GamesController < ApplicationController
  before_action :set_game, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]

  # GET /games or /games.json
  def index
    @games = Game.all
    render json: @games, status: :ok
  end

  # GET /games/1 or /games/1.json
  def show
    @game = Game.find_by(id: params[:id])
    if @game 
      render json: @game, status: :ok
    else
      render json: {error: "game not found"}, status: :not_found
    end
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games or /games.json
  def create
    @game = Game.new(game_params)

    # respond_to do |format|
    #   if @game.save
    #     format.html { redirect_to game_url(@game), notice: "Game was successfully created." }
    #     format.json { render :show, status: :created, location: @game }
    #   else
    #     format.html { render :new, status: :unprocessable_entity }
    #     format.json { render json: @game.errors, status: :unprocessable_entity }
    #   end
    # end
    if @game.save
      render json:@game, status: :ok
    else
      render json: { error: "Error creating game data"}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /games/1 or /games/1.json
  def update
    # respond_to do |format|
    #   if @game.update(game_params)
    #     format.html { redirect_to game_url(@game), notice: "Game was successfully updated." }
    #     format.json { render :show, status: :ok, location: @game }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @game.errors, status: :unprocessable_entity }
    #   end
    # end
    if @game.update(game_params)
      render json:@game, status: :ok
    else
      render json: { error: "Error updating game data"}, status: :unprocessable_entity
    end
  end

  # DELETE /games/1 or /games/1.json
  def destroy
    @game = Game.find_by(id: params[:id])
    if @game 
      @game.destroy!
      render json:@game, status: :ok
    else
      render json: { error: "game is not found"}, status: :not_found
    end
    # respond_to do |format|
    #   format.html { redirect_to games_url, notice: "Game was successfully destroyed." }
    #   format.json { head :no_content }
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:playerName, :score)
    end
end
