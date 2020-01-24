class Api::SessionsController < ApplicationController
  def index
  end

  def show
  end

  def create
    minutes = params[:timerTime] / (1000 * 60) 
    puts minutes
		# session = Session.new(session_params)
		# if session.save
		# 	current_user.add_session session.id
		# 	render json: session
		# else
		# 	render json: session.errors, status: 422
		# end
  end

  def update
  end

  def destroy
  end

  private 
		def session_params
			params.require(:session).permit(
        :total_minutes,
        :task_id,
        :user_id
				)
		end

end


