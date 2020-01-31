class Api::SessionsController < ApplicationController
	before_action :authenticate_user!
	before_action :set_session, only: [:update, :destroy]

  def index
  end

  def show
  end

  def create
    minutes = params[:timerTime] / (1000 * 60) 
   
		session = current_user.sessions.new(total_minutes: minutes, task_id: params[:task_id])
		if session.save
			render json: session
		else
			render json: session.errors, status: 422
		end
  end

	def update
		minutes = params[:timerTime] / (1000 * 60)
		if @session.update(total_minutes: @session.total_minutes + minutes)
			render json: @session
		else
			render json: session.errors, status: 422
		end
  end

	def destroy
		@session.destroy
  end

  private 
		def session_params
			params.require(:session).permit(
        :task_id,
				)
		end

		def set_session
			@session = Session.find(params[:id])
		end

end


