class Api::TimesheetsController < ApplicationController
  before_action :authenticate_user!
	before_action :set_timesheet, only: [:show, :update, :destroy]

	def index
		render json: current_user.timesheets.all
  end

	def show
		render json: @timesheet
  end

	def create
		timesheet = Timesheet.new(timesheet_params)
		if timesheet.save
			render json: timesheet
		else
			render json: timesheet.errors, status: 422
		end
  end

	def update
		if @timesheet.update(timesheet_params)
			render json: @timesheet.id
		else
			render json: @timesheet.errors, status: 422
		end
  end

	def destroy
		if @timesheet.timesheet_admins.includes(current_user.id)
			@timesheet.destroy
		else
			render status: 401
		end
	end
	
	private 
		def set_timesheet
			@timesheet = Timesheet.find(params[:id])
		end
		def timesheet_params
			params.require(:timesheet).permit(
        :start_date,
        :user_id
				)
		end
end
