
a = User.create(
  email:'admin@hourglass.com',
  password: 'password'
)
a1 = User.create(
  email:'admin1@hourglass.com',
  password: 'password'
)

admins = [a, a1]
User.create(
  email:'standard@hourglass.com',
  password: 'password'
)
random_users = []

rand(1..7).times do
	random_users.push(User.all.sample.id)
end

random_users = random_users.clean

i = 0
5.times do 
	project = Project.create(
		title: "Project#{i}",
		description: "This is a project test",
		client_name: "Me Foo",
		planned_start: DateTime.now,
		planned_end: nil,
		budget: 1000.00 * rand(12),
		complete: false,
		spent: 500.25 * rand(25),
		cost: 30.18 * rand(100),
		project_admins: [admins.sample.id],
		all_users: random_users
	)
	User.all.each do |u|
		if project.all_users.include?(u)
			u.update(projects: u.projects.push(project.id))
		end
	end
	i+=1
end

puts "Test Projects Seeded!"

