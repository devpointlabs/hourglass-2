class Api::TeamsController < ApplicationController
	before_action :authenticate_user!
	before_action :set_team, except: [:create]

	def index
		render json: @team
  end

	def create
		unless current_user.team
			@team = current_user.team.new(team_params)
			if @team.save
				render json: @team
			else
				render json: @team.errors, status: 422
			end
		else
			render status: 401
		end
  end

	def update
		if @team.update(team_params, params[:members_ids])
			render json: @team
		else
			render json: @team.errors, status: 422
		end
  end

	def destroy
		if current_user.id == @team.user_id
			@team.destroy
		else
			render status: 401
		end
	end
	
	private
		def team_params
			params.require(:team).permit(:name,:company)
		end

		def set_team
			@team = current_user.team
		end
end
